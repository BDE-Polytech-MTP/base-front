/**
 * Unregistered user model.
 */
export interface UnregisteredUser {

    /** User unique identifier */
    userUUID: string;

    /* User firstname */
    firstname?: string;

    /** User lastname */
    lastname?: string;

    /** User email (unique) */
    email: string;

    /** UUID of the BDE the user belongs to */
    bdeUUID: string;

    /** User permissions */
    permissions: string[];

    member?: boolean;

}

/**
 * Registered user model.
 */
export interface User {

    /** User unique identifier */
    userUUID: string;

    /* User firstname */
    firstname: string;

    /** User lastname */
    lastname: string;

    /** User email (unique) */
    email: string;

    /** UUID of the BDE the user belongs to */
    bdeUUID: string;

    /** User specialty name */
    specialtyName: string;

    /** User specialty year */
    specialtyYear: number;

    /** User permissions */
    permissions: string[];

    member?: boolean;

}
