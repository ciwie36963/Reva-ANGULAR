import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import * as objectPath from 'object-path';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { CountdownComponent } from 'ngx-countdown';
import { ViewChild } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';



@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html'
	
})
export class DashboardComponent implements OnInit {

	public config: any;
	timeLeft: number = 0;
	expoDate : Date;
	seconds : number 
	days : number 
	hours : number 
	minutes : number 

	errorMsg : string;
	@ViewChild(CountdownComponent) counter: CountdownComponent;
	constructor(
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private subheaderService: SubheaderService, 
		private _authenticationService: AuthenticationService,
		private ngZone : NgZone,
		private changeDector : ChangeDetectorRef
	) {
	}	

	ngOnInit(): void {
		// change page config, refer to config/layout.ts
		interval(1000).subscribe(() => {
			if (this.timeLeft > 0){
				this.timeLeft -= 1
			}			
		this.formatDateFields()
		});
		const newLayoutOption = objectPath.set(this.layoutConfigService.layoutConfig, 'config.aside.left.display', false);
		this.layoutConfigService.setModel(newLayoutOption, true);
		this._authenticationService.expoDate.subscribe(
			date => {
				this.expoDate = date; 

				var date1 = new Date();
				var date2 = new Date(this.expoDate);
				var diffInSeconds = Math.abs((date1.getTime() - date2.getTime()) / 1000);
				this.timeLeft = Math.round(diffInSeconds);
				this.formatDateFields()
			},
				(error: HttpErrorResponse) => {
					this.errorMsg = `Kon de datum van de beurs niet achterhalen.`;
				  }
		);
		
	}
	formatDateFields() {
		this.expoDate = new Date(this.timeLeft)
		this.seconds = this.timeLeft
		 this.days = Math.floor(this.seconds / (3600*24));
		this.seconds  -= this.days*3600*24;
		 this.hours   = Math.floor(this.seconds / 3600);
		this.seconds  -= this.hours*3600;
		 this.minutes = Math.floor(this.seconds / 60);
		this.seconds  -= this.minutes*60;
	}
}
