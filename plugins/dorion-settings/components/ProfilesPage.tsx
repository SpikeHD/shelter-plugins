import { Dropdown } from '../../../components/Dropdown'
import { css, classes } from './ProfilesPage.tsx.scss'

const { invoke, process } = (window as any).__TAURI__

const {
  ui: { Header, Button, HeaderTags, TextBox, injectCss },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function ProfilesPage() {
  const [profileList, setProfileList] = createSignal<string[]>([])
  const [profile, setProfile] = createSignal<string>('')
  const [internalProfile, setInternalProfile] = createSignal<string>('')
  const [newProfile, setNewProfile] = createSignal<string>('')

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    const profiles = await invoke('get_profile_list')
    setProfileList(profiles)

    const config = JSON.parse(await invoke('read_config_file'))
    setProfile(config.profile || 'default')
    setInternalProfile(config.profile || 'default')
  })

  const saveProfile = async () => {
    const config = JSON.parse(await invoke('read_config_file'))

    config.profile = profile()

    await invoke('write_config_file', {
      contents: JSON.stringify(config),
    })

    // Relaunch
    process.relaunch()
  }

  const deleteProfile = async () => {
    await invoke('delete_profile', {
      name: profile(),
    })

    // Remove the profile from the list
    setProfileList(profileList().filter((p) => p !== profile()))

    // Set profile back to internal profile
    setProfile(internalProfile())
  }

  const createProfile = async () => {
    await invoke('create_profile', {
      name: newProfile(),
    })

    // if the profile isn't in the state list, add it
    if (!profileList().includes(newProfile())) {
      setProfileList([...profileList(), newProfile()])
    }

    // Also set it as the select profile in the list
    setProfile(newProfile())
  }

  const handleNewProfileChange = (value: any) => {
    setNewProfile(value)
  }

  return (
    <>
      <Header tag={HeaderTags.H1}>Profiles</Header>
      <Dropdown
        options={profileList().map((p: string) => {
          return {
            label: p,
            value: p,
          }
        })}
        placeholder={'Select profile...'}
        maxVisibleItems={5}
        closeOnSelect={true}
        onChange={(v) => setProfile(v)}
        selected={profile()}
      />

      <Header class={classes.shead}>Create Profile</Header>
      <TextBox
        type="text"
        value={newProfile()}
        onInput={handleNewProfileChange}
        placeholder={'Enter a name for the new profile...'}
      />

      <Button
        onClick={createProfile}
        class={classes.sbutton}
        disabled={newProfile() === '' || profileList().includes(newProfile())}
      >
        Create Profile
      </Button>

      <div class={classes.pbuttons}>
        <Button
          onClick={saveProfile}
          class={classes.splitbutton}
        >
          Save and Restart
        </Button>

        <Button
          onClick={deleteProfile}
          class={classes.splitbutton}
          disabled={profile() === 'default' || internalProfile() === profile}
        >
          Delete Selected Profile
        </Button>
      </div>
    </>
  )
}
