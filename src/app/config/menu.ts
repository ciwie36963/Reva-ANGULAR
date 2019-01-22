// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			header: {
				self: {},
				items: [
					{
						title: 'Dashboard',
						root: true,
						page: '/'
					},
					{
						title: 'Volledige vragenlijst',
						root: true,
						icon: 'flaticon-list-2',
						page: "/teacher/list",
						roles: ["TEACHER"]
					},
					{
						title: 'Beantwoorde vragen',
						root: true,
						icon: 'flaticon-clipboard',
						page: "/teacher/groupsanswered",
						roles: ["TEACHER"]
					},
					{
						title: 'Groepen',
						root: true,
						icon: 'flaticon-users',
						page: "/teacher/groups",
						roles: ["TEACHER"]
					},
					{
						title: 'Categorieën beheren',
						root: true,
						icon: 'flaticon-technology-1',
						page: "/admin/categorieenbeheren",
						roles: ["ADMIN"]
					},
					{
						title: 'Exposanten beheren',
						root: true,
						icon: 'flaticon-users',
						page: "/admin/exposantenbeheren",
						roles: ["ADMIN"]
					},
					{
						title: 'Exposanten lokaliseren',
						root: true,
						icon: 'flaticon-placeholder-1',
						page: "/admin/exposantenlokaliseren",
						roles: ["ADMIN"]
					},
					{
						title: 'Volledige vragenlijst',
						root: true,
						icon: 'flaticon-list-2',
						page: "/shared/list",
						roles: ["ERGO", "ADMIN"]
					},
					{
						title: 'Vraag toevoegen',
						root: true,
						icon: 'flaticon-add',
						page: "/shared/editquestion/0",
						roles: ["ERGO", "ADMIN"]
					},
					{
						title: 'Websitebeheer',
						root: true,
						icon: 'flaticon-settings',
						page: "/admin/websitebeheer",
						roles: ["ADMIN"]
					}
				]
			},
			aside: {
				self: {},
				items: [
					{
						section: "Departments"
					},
					{
						title: "Resources",
						desc: "",
						icon: "flaticon-layers",
						bullet: "dot",
						root: true,
						submenu: [
							{
								title: "Layout Builder",
								page: "/builder",
							},
							{
								title: "Timesheet",
								tooltip: 'Non functional dummy link',
							},
							{
								title: "Payroll",
								tooltip: 'Non functional dummy link',
							},
							{
								title: "Contacts",
								tooltip: 'Non functional dummy link',
							}
						]
					},
					{
						title: "Finance",
						root: true,
						icon: "flaticon-suitcase",
					},
					{
						title: "Support",
						root: true,
						icon: "flaticon-graphic-1",
						submenu: [
							{
								title: "Reports",
								tooltip: 'Non functional dummy link',
							},
							{
								title: "Cases",
								submenu: [
									{
										title: "Pending",
										tooltip: 'Non functional dummy link',
									},
									{
										title: "Urgent",
										tooltip: 'Non functional dummy link',
									},
									{
										title: "Done",
										tooltip: 'Non functional dummy link',
									},
									{
										title: "Archive",
										tooltip: 'Non functional dummy link',
									}
								]
							},
							{
								title: "Clients",
								tooltip: 'Non functional dummy link',
							},
							{
								title: "Audit",
								tooltip: 'Non functional dummy link',
							}
						]
					},
					{
						title: "Administration",
						root: true,
						icon: "flaticon-light",
						tooltip: 'Non functional dummy link',
					},
					{
						title: "Management",
						root: true,
						icon: "flaticon-share",
						tooltip: 'Non functional dummy link',
					},
					{ section: "Reports" },
					{
						title: "Accounting",
						root: true,
						icon: "flaticon-graphic",
						tooltip: 'Non functional dummy link',
					},
					{
						title: "Products",
						root: true,
						icon: "flaticon-network",
						tooltip: 'Non functional dummy link',
					},
					{
						title: "Sales",
						root: true,
						icon: "flaticon-network",
						tooltip: 'Non functional dummy link',
					},
					{
						title: "IPO",
						root: true,
						icon: "flaticon-technology",
						tooltip: 'Non functional dummy link',
					}
				],

			}
		}
	}
}

