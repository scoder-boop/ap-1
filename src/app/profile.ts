
export interface Profile {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	phoneNumber: number;
	active: boolean;
	editable: boolean;
}
export class ProfileObject implements Profile {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	phoneNumber: number;
	active: boolean;
	editable: boolean;
}