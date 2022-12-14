
import WaypointListedView from '../view/waypoint-listed-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
import EditFormView from '../view/edit-form-view.js';

export default class PointPresenter {

  pointListComponent = new WaypointListedView();

  constructor({pointListContainer, pointModel}) {
    this.pointListContainer = pointListContainer;
    this.pointModel = pointModel;
  }


  init() {
    this.points = [...this.pointModel.getPoints()];

    render(this.pointListComponent, this.pointListContainer);
    render(new EditFormView({}), this.pointListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.pointListComponent.getElement());
    }

  }
}
