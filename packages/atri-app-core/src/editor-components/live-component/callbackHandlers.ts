import { liveApi } from "../../api";

const API_ENDPOINT = process.env["ATRI_APP_API_ENDPOINT"];

function handleRedirection(res: Response) {
  if (res.headers.get("location")) {
    const location = res.headers.get("location");
    const locationTarget = (res.headers.get("location-target") ||
      "_self") as any;
    const locationType = res.headers.get("location-type") || "internal";
    if (location && locationType === "external") {
      navigateExternally({ urlPath: location, target: locationTarget });
    } else if (location && locationType === "internal") {
      callInternalNavigationSubscribers({ urlPath: location });
    }
  }
  return res;
}

function updatePropsFromDelta(delta: { [alias: string]: any }) {
  const aliases = Object.keys(delta);
  aliases.forEach((alias) => {
    const compId = liveApi.getComponentIdFromAlias(alias);
    if (compId) liveApi.mergeProps(compId, delta[alias]);
  });
}

export function sendEventDataFn(
  // alias of component on which event was fired
  alias: string,
  // name of the page in which the event was fired
  pageState: any,
  // route of the page in which the event was fired
  pageRoute: string,
  // name of the callback that fired this event
  callbackName: string,
  // data passed in the callback
  eventData: any
) {
  return fetch(`${API_ENDPOINT}/_atri/api/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      alias,
      route: pageRoute,
      callbackName,
      eventData,
      state: pageState,
    }),
  })
    .then((res) => {
      try {
        res.json();
      } catch {}
      return res;
    })
    .then((res) => {
      if (res) {
        updatePropsFromDelta(res);
      }
      return res;
    })
    .then((res) => handleRedirection(res));
}

type InternalNavigationSubscriberCallback = (options: {
  urlPath: string;
}) => void;
const internalNavigationSubscribers: InternalNavigationSubscriberCallback[] =
  [];
export function subscribeInternalNavigation(
  cb: InternalNavigationSubscriberCallback
) {
  internalNavigationSubscribers.push(cb);
  return () => {
    const foundIndex = internalNavigationSubscribers.findIndex(
      (curr) => curr === cb
    );
    if (foundIndex >= 0) {
      internalNavigationSubscribers.splice(foundIndex, 1);
    }
  };
}
export function callInternalNavigationSubscribers(options: {
  urlPath: string;
}) {
  internalNavigationSubscribers.forEach((cb) => {
    try {
      cb(options);
    } catch {}
  });
}

export function navigateExternally(options: {
  urlPath: string;
  target?: "_blank" | "_self";
}) {
  const { urlPath, target } = options;
  if (urlPath.startsWith("/")) {
    const newUrl =
      window.location.protocol + "//" + window.location.host + urlPath;
    window.open(newUrl, target);
  } else {
    try {
      window.open(urlPath, target);
    } catch (err) {
      console.log(err);
    }
  }
}