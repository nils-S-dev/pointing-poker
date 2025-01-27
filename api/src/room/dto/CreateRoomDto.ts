export interface CreateRoomDto {
    readonly procedure: string; // can be any user-defined procedure. the API behaves agnostic.
    readonly user: string;
}