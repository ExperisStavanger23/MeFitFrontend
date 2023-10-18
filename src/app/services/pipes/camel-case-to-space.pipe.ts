import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "camelCaseToSpace",
})
export class CamelCaseToSpacePipe implements PipeTransform {
  transform(value: string): string {
    // Use regular expressions to insert spaces
    return value.replace(/([a-z])([A-Z])/g, "$1 $2")
  }
}
