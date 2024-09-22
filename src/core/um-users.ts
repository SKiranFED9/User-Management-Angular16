export interface UmUsers {
    id : number,
    firstName? : string,
    lastName? :  string,
    userName? :  string,
    selectedDepartment:  [
        {
            name?: string
        }
    ]
}
