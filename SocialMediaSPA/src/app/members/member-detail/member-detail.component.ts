import { AlertifyService } from "./../../_services/alertify.service";
import { UserService } from "./../../_services/user.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "src/app/_models/User";
import { ActivatedRoute } from "@angular/router";
import { NgxGalleryOptions, NgxGalleryAnimation } from "ngx-gallery";
import { NgxGalleryImage } from "ngx-gallery";
import { TabsetComponent } from "ngx-bootstrap/tabs";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild("memberTabs", { static: true }) memberTabs: TabsetComponent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  user: User;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
    this.route.queryParams.subscribe((params) => {
      const selectedTab = params["tab"];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
    //this.loadUser()
  }
  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imageUrls;
  }
  //members/4
  //4 is Id which we get using route module

  //As we are getting data in resolver
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params["id"]).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
