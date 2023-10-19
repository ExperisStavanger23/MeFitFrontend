import { Pipe, PipeTransform } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

@Pipe({
  name: "safe",
})
/**
 * Class responsible for sanitizing URLs. Used to display YouTube videos and load some image urls
 */
export class SafePipeService implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
