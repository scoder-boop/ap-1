
export interface Site {
	id: number;
	name: string;
	siteType: string;
	connectionString: string;
	description: string;
	siteAuthDetails: string;
	acceptXpath: string;
	useable: boolean;
  editable: boolean;
}
export class SiteObject implements Site{
	id: number;
	name: string;
	siteType: string;
	connectionString: string;
	description: string;
	siteAuthDetails: string;
	acceptXpath: string;
	useable: boolean;
	editable: boolean;
}
