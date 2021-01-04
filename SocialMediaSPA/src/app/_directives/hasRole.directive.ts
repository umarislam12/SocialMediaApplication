import { AuthService } from "src/app/_services/auth.service";
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[appHasRole]",
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisible = false;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const userRole = this.authService.decodedToken.role as Array<string>;
    //if no role clear the view container
    if (!userRole) {
      this.viewContainerRef.clear();
    }
    ////if userr has role needed to render the element
    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        //templateRef referes to the element we are applying directive to
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
