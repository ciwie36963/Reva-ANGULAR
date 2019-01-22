import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminDataService } from '../admin-data.service';
import { Exhibitor } from '../exhibitor/exhibitor.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-localise-exhibitor',
  templateUrl: './localise-exhibitor.component.html',
  styleUrls: ['./localise-exhibitor.component.css']
})
export class LocaliseExhibitorComponent implements OnInit {

  public exhibitorForm: FormGroup;
  private _exhibitors: Exhibitor[];
  private _exhibitorsTeToevoegen: Exhibitor[];
  private _exhibitorsTeWijzigen: Exhibitor[];

  public connectionErrorMsg: string;
  public formErrorMsg: string;

  xCoordinaat: number = 0
  yCoordinaat: number = 0

  selectTeToevoegen: HTMLSelectElement;
  selectTeWijzijgen: HTMLSelectElement;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasOffsetLeft = 0
  canvasOffsetTop = 0

  versleept = false;
  aantSlepen = false;
  currentX = 0
  currentY = 0
  XcoBijKlik = 0
  YcoBijKlik = 0
  verschilX = 0
  verschilY = 0
  background: HTMLImageElement
  pin: HTMLImageElement

  constructor(private _adminDataService: AdminDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.exhibitorForm = this.fb.group({
      teToevoegenId: [],
      teWijzigenId: [],
      xCo: [],
      yCo: [],

    });


    this._adminDataService.exhibitors.subscribe
      (dudes => {
      this._exhibitorsTeToevoegen = dudes.filter(
        e => e.coordinates == null
      )
      });

    this._adminDataService.exhibitors.subscribe
      (dudes => {
      this._exhibitorsTeWijzigen = dudes.filter(
        e => e.coordinates != null
      )
      });

    this._adminDataService.exhibitors.subscribe(
      exhibitors => (this._exhibitors = exhibitors),
      (error: HttpErrorResponse) => {
        this.connectionErrorMsg = `Er is een fout opgetreden bij het laden van de exposanten.`;
      }
    );

    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.background = new Image();
    this.background.src = "/assets/grondplan.jpg"

    this.selectTeToevoegen = <HTMLSelectElement>document.getElementById("teToevoegenId");
    this.selectTeWijzijgen = <HTMLSelectElement>document.getElementById("teWijzigenId");

    this.pin = new Image();
    this.pin.src = "/assets/pin.png"
    //Wait for image to have loaded
    this.background.onload = (event) => {
    this.laadKaart()
    }
   // this.ctx.drawImage(this.background, 0 - this.currentX, 0 - this.currentY);
    this.calculateCurrentCanvasOffset()

  }

  get exhibitors() {
    return this._exhibitors;
  }
  get exhibitorsTeToevoegen() {
    return this._exhibitorsTeToevoegen;
  }
  get exhibitorsTeWijzigen() {
    return this._exhibitorsTeWijzigen;
  }
  get XCoordinaat() {
    return this.xCoordinaat
  }
  get YCoordinaat() {
    return this.yCoordinaat
  }

  laadKaart() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0 - this.currentX, 0 - this.currentY);
  }

  onSubmit() {

    this.formErrorMsg = ""

    var id

    if (this.exhibitorForm.value.teToevoegenId != null)
      id = this.exhibitorForm.value.teToevoegenId

    if (this.exhibitorForm.value.teWijzigenId != null)
      id = this.exhibitorForm.value.teWijzigenId

    if (id != null && this.exhibitorForm.value.xCo != null && this.exhibitorForm.value.yCo != null) {
      var exhibitor = this.exhibitors.find(e => e.id == id);


      exhibitor.setCoordinates(this.exhibitorForm.value.xCo, this.exhibitorForm.value.yCo);


      this._adminDataService.modifyExhibitor(exhibitor).subscribe()

      this._exhibitorsTeToevoegen = this._exhibitorsTeToevoegen.filter(e => e.id != id);
      
      if (this.exhibitorsTeWijzigen.indexOf(exhibitor) == -1){
        this.exhibitorsTeWijzigen.push(exhibitor);

      }

      this.clearForm()

      this.laadKaart();
    } else {
      if (id == null) {
        this.formErrorMsg += "Gelieve eerst een exposant te selecteren. ";
      }
      if (this.exhibitorForm.value.xCo == null || this.exhibitorForm.value.yCo == null) {
        this.formErrorMsg += "Gelieve eerst op de kaart te klikken voor de coordinaten."
      }
    }


  }

  clearForm() {
    //Clear the input
    this.exhibitorForm.reset()
    this.xCoordinaat = 0;
    this.yCoordinaat = 0;
  }

  selectToevoegenGeklikt() {
    this.exhibitorForm.value.teWijzigenId = null
    this.selectTeWijzijgen.selectedIndex = -1
    this.xCoordinaat = 0;
    this.yCoordinaat = 0;
    this.laadKaart();

  }
  selectWijzigenGeklikt() {
    this.exhibitorForm.value.teToevoegenId = null
    this.selectTeToevoegen.selectedIndex = -1
    this.xCoordinaat = 0;
    this.yCoordinaat = 0;
    this.laadKaart();
    

    let exhibitor = this._exhibitorsTeWijzigen.find(e => e.id == this.exhibitorForm.value.teWijzigenId);


    if (exhibitor) {
      this.drawPin(exhibitor.coordinates.xCo, exhibitor.coordinates.yCo);
      this.xCoordinaat = exhibitor.coordinates.xCo;
      this.yCoordinaat = exhibitor.coordinates.yCo;
      this.exhibitorForm.value.xCo = this.xCoordinaat
      this.exhibitorForm.value.yCo = this.yCoordinaat

    }
  }
  mouseDown(event: MouseEvent): void {

    this.calculateCurrentCanvasOffset()

    var xCo = event.x - this.canvasOffsetLeft
    var yCo = event.y - this.canvasOffsetTop

    this.XcoBijKlik = xCo;
    this.YcoBijKlik = yCo;

    this.aantSlepen = true;

    this.versleept = false
  }

  mouseUp(event: MouseEvent): void {

    this.calculateCurrentCanvasOffset()

    var xCo = event.x - this.canvasOffsetLeft
    var yCo = event.y - this.canvasOffsetTop

    this.aantSlepen = false;

    this.verschilX = this.XcoBijKlik - xCo;
    this.verschilY = this.YcoBijKlik - yCo;

    this.currentX = this.currentX + this.verschilX;
    this.currentY = this.currentY + this.verschilY;

    if (!this.versleept) {
      this.drawPin(xCo, yCo);

      //Alleen als de kaart niet versleept is en er geklikt werd mogen de waarden in het formulier aangepast worden
      this.xCoordinaat = xCo + this.currentX;
      this.yCoordinaat = yCo + this.currentY;

      this.exhibitorForm.value.xCo = this.xCoordinaat;
      this.exhibitorForm.value.yCo = this.yCoordinaat;
    }

    this.canvas.classList.remove("cursor-grabbing");
    this.canvas.classList.add("cursor-pointer");


  }

  mouseOut(event: MouseEvent): void {

    this.aantSlepen = false;

  }

  mouseMove(event: MouseEvent): void {

    this.calculateCurrentCanvasOffset()

    var xCo = event.x - this.canvasOffsetLeft
    var yCo = event.y - this.canvasOffsetTop

    if (this.aantSlepen) {
      this.verschilX = this.XcoBijKlik - xCo;
      this.verschilY = this.YcoBijKlik - yCo;

      this.XcoBijKlik = xCo;
      this.YcoBijKlik = yCo;

      this.currentX = this.currentX + this.verschilX;
      this.currentY = this.currentY + this.verschilY;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.background, 0 - this.currentX, 0 - this.currentY);

      this.canvas.classList.add("cursor-grabbing");
      this.canvas.classList.remove("cursor-pointer");

      this.versleept = true
    }

  }

  drawPin(xCo: number, yCo: number) {
    this.laadKaart()
    this.ctx.drawImage(this.pin, xCo - 26, yCo - 65, 90, 70);
  }

  calculateCurrentCanvasOffset() {
    var canvasOffset = this.canvas.getBoundingClientRect();
    this.canvasOffsetTop = canvasOffset.top;
    this.canvasOffsetLeft = canvasOffset.left;
  }


}
