
export interface ProfileInterest {
	id: number;
	profileId: number;
	topic: string;
	active: boolean;
	editable: boolean;
}
export class ProfileInterestObject implements ProfileInterest {
	id: number;
	profileId: number;
	topic: string;
	active: boolean;
	editable: boolean;
}
