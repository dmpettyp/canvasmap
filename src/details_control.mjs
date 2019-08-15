import { RunLoop } from './run_loop.mjs';

export class DetailsControl {
  constructor() {
    this.selection_ = undefined;
    this.createDetailsPane();
  }

  createDetailsPane() {
    this.createStylesheet();

    this.pane_ = document.createElement("div");
    this.pane_.classList.add("details_pane", "initial");

    this.pane_.appendChild(this.createLayoutStyleOptions());

    document.body.appendChild(this.pane_);
  }

  createLayoutStyleOptions() {
    const select = document.createElement("select");
    select.name = "layout_style";

    const styles = ["default", "tree", "list"];
    for (let i = 0; i < styles.length; ++i) {
      const option = document.createElement("option");
      option.value = styles[i];
      option.innerText = styles[i];
      select.appendChild(option);
    }
    select.addEventListener("change", (e) => this.layoutStyleChanged(e.target.value));
    this.layout_style_select_ = select;
    return select;
  }

  createStylesheet() {
    console.assert((window.process && window.process.env &&
                    window.process.env.NODE_ENV == "test") ||
                   !document.getElementById("details_control_stylesheet"));

    const link = document.createElement("link");
    link.id = "details_control_stylesheet";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "stylesheets/details_control.css?a=" + (new Date()).valueOf();
    link.media = "all";
    document.head.appendChild(link);
  }

  layoutStyleChanged(new_value) {
    if (this.selection_) {
      this.selection_.layout_style = new_value;
      RunLoop.postTaskAndDraw();
    }
  }

  handleNewSelection(item) {
    this.selection_ = item;
    this.pane_.classList.remove("initial", "hidden");
    this.pane_.classList.add("visible");

    this.updateDetails();
  }

  removeSelection() {
    this.selection_ = undefined;
    this.pane_.classList.remove("initial", "visible");
    this.pane_.classList.add("hidden");
  }

  updateDetails() {
    for (let i = 0; i < this.layout_style_select_.options.length; ++i) {
      this.layout_style_select_.options[i].selected =
          this.selection_.layout_style ==
          this.layout_style_select_.options[i].value;
    }
  }
}
