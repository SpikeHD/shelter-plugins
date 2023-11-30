import { Dropdown } from "../../components/Dropdown";
import { css, classes } from "./settings.scss";

const {
  plugin: { store },
  ui: { SwitchItem, Header, injectCss },
} = shelter;

let injectedCss = false;

export default () => {
  if (!injectedCss) {
    injectedCss = true;
    injectCss(css);
  }

  return (
    <>
      <Header class={classes.shead}>Message Notifications</Header>
      <Dropdown
        value={store.notifications}
        onChange={(e) => (store.notifications = e.target.value)}
        options={[
          {
            label: "All messages",
            value: 0,
          },
          {
            label: "Only @mentions",
            value: 1,
          },
          {
            label: "Nothing",
            value: 2,
          },
        ]}
        selected={store.notifications === undefined ? 1 : store.notifications}
      />
      
      <Header class={classes.shead}>Selective Mutes</Header>
      <SwitchItem
        value={store.mute_everyone}
        onChange={(v) => (store.mute_everyone = v)}
      >
        Suppress @everyone and @here
      </SwitchItem>
      <SwitchItem
        value={store.mute_roles}
        onChange={(v) => (store.mute_roles = v)}
      >
        Suppress all role mentions
      </SwitchItem>
      <SwitchItem
        value={store.mute_highlights}
        onChange={(v) => (store.mute_highlights = v)}
      >
        Suppress highlights
      </SwitchItem>
      <SwitchItem
        value={store.mute_events}
        onChange={(v) => (store.mute_events = v)}
      >
        Mute all events
      </SwitchItem>
      <SwitchItem
        value={store.mute_mobile}
        onChange={(v) => (store.mute_mobile = v)}
      >
        Mute mobile notifications
      </SwitchItem>
    </>
  );
};
