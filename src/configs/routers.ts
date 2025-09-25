import INDEX from '../pages/index.jsx';
import CREATE from '../pages/create.jsx';
import GALLERY from '../pages/gallery.jsx';
import LOGIN from '../pages/login.jsx';
import REGISTER from '../pages/register.jsx';
import MEMBERSHIP from '../pages/membership.jsx';
import SUBSCRIPTION from '../pages/subscription.jsx';
import WORKS from '../pages/works.jsx';
import DASHBOARD from '../pages/dashboard.jsx';
import TEXTTOVIDEOPAGE from '../pages/TextToVideoPage.jsx';
import IMAGETOVIDEOPAGE from '../pages/ImageToVideoPage.jsx';
import DIGITALHUMANPAGE from '../pages/DigitalHumanPage.jsx';
export const routers = [{
  id: "index",
  component: INDEX
}, {
  id: "create",
  component: CREATE
}, {
  id: "gallery",
  component: GALLERY
}, {
  id: "login",
  component: LOGIN
}, {
  id: "register",
  component: REGISTER
}, {
  id: "membership",
  component: MEMBERSHIP
}, {
  id: "subscription",
  component: SUBSCRIPTION
}, {
  id: "works",
  component: WORKS
}, {
  id: "dashboard",
  component: DASHBOARD
}, {
  id: "TextToVideoPage",
  component: TEXTTOVIDEOPAGE
}, {
  id: "ImageToVideoPage",
  component: IMAGETOVIDEOPAGE
}, {
  id: "DigitalHumanPage",
  component: DIGITALHUMANPAGE
}]