import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

    transform(categories: string[], name: string): string[] {
        if (!name || name.length === 0) {
            return categories;
        }
        return categories.filter(category =>
            category.toLowerCase().includes(name.toLowerCase())
        );
    }
}