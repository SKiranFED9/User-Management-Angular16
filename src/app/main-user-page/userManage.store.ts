import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { exhaustMap, Observable, switchMap, tap } from "rxjs";
import { UserManagementService } from "src/core/services/user-management.service";
import { User } from "src/core/user.model";

type actionType = 'Add' | 'Update';
interface userState {
    users: readonly User[];
    loading: boolean;
    error: HttpErrorResponse | null;
    action: actionType;
}
@Injectable()
export class userStore extends ComponentStore<userState> {
    constructor( ) {
        super( {
            users : [],
            loading:false,
            error: null,
            action: "Add",
        })
    }

    
    userService = inject(UserManagementService);

    //selectors
    private readonly users$ = this.select((s) => s.users);
    private readonly loading$ = this.select((s) => s.users);
    private readonly error$ = this.select((s) => s.error);
    private readonly action$ = this.select((s) => s.action);


    //view model
    readonly vm$ = this.select({
        users: this.users$,
        loading: this.loading$,
        error: this.error$,
        action: this.action$
    })

   private readonly setLoading = this.updater((state) => ({
        ...state,
        loading:true,
   }));

    private readonly setError = this.updater((state, error: HttpErrorResponse) => ({
        ...state,
        loading: false,
        error: error
    }));

    private readonly addUsers = this.updater((state, users: User[]) =>({
            ...state,
            loading: false,
            users,
    }));

    private readonly addUserToState = this.updater((state, user: User) => ({
        ...state,
        loading: false,
        users: [...state.users, user],
    }));

    private readonly updateUserState = this.updater((state, user: User) => ({
        ...state,
        loading: false,
        users: state.users.map(m => m.id === user.id ? user : m),
    }));

    private readonly deleteUserFromState = this.updater((state, id: string) => ({
        ...state,
        loading: false,
        users: state.users.filter((m) => m.id != id ),
    }));



    public readonly setAction = this.updater((state, action:actionType) => ({
        ...state,
        action,
   }));


    readonly loadUsers = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            tap(( ) => this.setLoading()),
            exhaustMap(() =>
                this.userService.getUsers().pipe(
                    tapResponse(
                        (apiResponse) => {
                            this.addUsers(apiResponse)
                        },
                        (error: HttpErrorResponse) => this.setError(error)
                    )
                )
            )
        );
    });

    readonly createUser = this.effect<User>((user$: Observable<User>) => {
        return user$.pipe(
            tap(( ) => this.setLoading()),
            switchMap((user) =>
                this.userService.addUser(user).pipe(
                    tapResponse(
                        (apiResponse: User) => {
                            this.addUserToState(apiResponse)
                        },
                        (error: HttpErrorResponse) => this.setError(error)
                    )
                )
            )
        );
    });

    readonly updateUser = this.effect<User>((user$: Observable<User>) => {
        return user$.pipe(
            tap(( ) => this.setLoading()),
            switchMap((user) =>
                this.userService.updateUser(user.id, user).pipe(
                    tapResponse(
                        (apiResponse: User) => {
                            this.updateUserState(apiResponse)
                        },
                        (error: HttpErrorResponse) => this.setError(error)
                    )
                )
            )
        );
    });

    readonly deleteUser = this.effect<string>((id$: Observable<string>) => {
        return id$.pipe(
            tap(( ) => this.setLoading()),
            switchMap((id) =>
                this.userService.deleteUser(id).pipe(
                    tapResponse(
                        ( ) => {
                            this.deleteUserFromState(id)
                        },
                        (error: HttpErrorResponse) => this.setError(error)
                    )
                )
            )
        );
    });
}