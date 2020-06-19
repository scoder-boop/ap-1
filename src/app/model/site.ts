export interface Site {
	id: number;
	siteType: string;
	connectionString: string;
	description: string;
	siteAuthDetails: string;
  editable: boolean;
}
export class Site implements Site{
	id: number;
	siteType: string;
	connectionString: string;
	description: string;
	siteAuthDetails: string;
	editable: boolean;
}
