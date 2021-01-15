import mixpanel from 'mixpanel-browser';

const mixpanelToken = process.env.MIXPANEL_TOKEN;

export const mixpanelClient = mixpanel.init(mixpanelToken);