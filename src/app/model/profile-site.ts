export interface ProfileSite {
	profileId: number;
	siteId: number;
	frequencyType: string;
	frequency: number;
	loginString: string;
	active: boolean;
	password_required: boolean;
	password: string;
	authDetails: string;
}
export class ProfileSite implements ProfileSite{
	profileId: number;
	siteId: number;
	frequencyType: string;
	frequency: number;
	loginString: string;
	active: boolean;
	password_required: boolean;
	password: string;
	authDetails: string;
}
