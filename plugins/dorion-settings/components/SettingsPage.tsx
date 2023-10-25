import { Dropdown } from "../../../components/Dropdown";

import { css, classes } from "./SettingsPage.tsx.scss"; 

const {
  ui: { Switch, SwitchItem, Button, Text, Header, HeaderTags, Divider },
  solid: {
    createSignal,
  }
} = shelter;

const { invoke, process } = (window as any).__TAURI__;

const getThemes = async () => {
  const themes: string[] = await invoke("get_theme_names");
  return themes.map((t: string) => ({
    label: t.replace(/"/g, "").replace(".css", "").replace(".theme", ""),
    value: t.replace(/"/g, ""),
  }));
};

const getPlugins = async () => {
  const plugins: DorionPlugin[] = await invoke("get_plugin_list");
  return plugins;
};

const openPluginsFolder = () => {
  invoke("open_plugins");
};

const openThemesFolder = () => {
  invoke("open_themes");
};

export function SettingsPage() {
  let [settings, setSettings] = createSignal<DorionSettings>({
    zoom: "1.0",
    client_type: "default",
    sys_tray: false,
    push_to_talk: false,
    push_to_talk_keys: [],
    theme: "none",
    use_native_titlebar: false,
    start_maximized: false,
    open_on_startup: false,
    startup_minimized: false,
    autoupdate: false,
    update_notify: true,
  });
  let [themes, setThemes] = createSignal<DorionTheme[]>([]);
  let [plugins, setPlugins] = createSignal<DorionPlugin[]>([]);

  (async () => {
    setSettings(JSON.parse(await invoke("read_config_file")));
    setThemes(await getThemes());
    setPlugins(await getPlugins());

    console.log("Got settings!");
  })();

  const saveSettings = async () => {
    await invoke("write_config_file", {
      contents: JSON.stringify(settings),
    });

    process.relaunch();
  };

  return (
    <>
      <Header tag={HeaderTags.H1}>Dorion Settings</Header>
      <Dropdown
        value={settings().theme}
        onInput={(v: string) => {
          setSettings({
            ...settings(),
            theme: v,
          });
        }}
        options={themes()}
      />

      <Header class={classes.shead}>Client Type</Header>
      <Dropdown
        options={[
          {
            label: "Default",
            value: "default",
          },
          {
            label: "Canary",
            value: "canary",
          },
          {
            label: "PTB",
            value: "ptb",
          },
        ]}
        placeholder={"Select a client type..."}
        maxVisibleItems={5}
        closeOnSelect={true}
        onInput={(v: string) => {
          setSettings({
            ...settings(),
            client_type: v,
          });
        }}
        selected={settings().client_type}
      />

      <Header class={classes.shead}>Window</Header>
      {/* TODO: SLIDER FOR ZOOM LEVEL */}
      <SwitchItem
        value={settings().sys_tray}
        onChange={(v) => setSettings({
          ...settings(),
          sys_tray: v,
        })}
        note="Instead of closing, Dorion will run in the background and will be accessible via the system tray."
      >
        Minimize to System Tray
      </SwitchItem>

      <SwitchItem
        value={settings().start_maximized}
        onChange={(v) => setSettings({
          ...settings(),
          start_maximized: v,
        })}
      >
        Start Maximized
      </SwitchItem>
    </>
  );
}
