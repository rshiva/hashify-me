import mixpanel from 'mixpanel-browser';

const mixpanelToken = process.env.MIXPANEL_TOKEN;
mixpanel.init(mixpanelToken);

export const trackEvent = (event: string, options?: object) => {
    if (process.env.NODE_ENV === "production") {
        mixpanel.track(event, options);
    } else {
        return null
    }
}