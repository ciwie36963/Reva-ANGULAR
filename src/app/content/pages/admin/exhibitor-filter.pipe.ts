import { Pipe, PipeTransform } from "@angular/core";
import { Exhibitor } from "./exhibitor/exhibitor.model";

@Pipe({
    name: 'exhibitorFilter'
})
export class ExhibitorFilterPipe implements PipeTransform {

    transform(exhibitors: Exhibitor[], name: string): Exhibitor[] {
        if (!name || name.length === 0) {
            return exhibitors;
        }
        return exhibitors.filter(exhibitor =>
            exhibitor.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}