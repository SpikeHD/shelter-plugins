import { Dropdown } from "../../../components/Dropdown"

const {
  ui: {
    Header,
    HeaderTags,
    Text
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

const { invoke } = (window as any).__TAURI__

export default () => {
  const [windows, setWindows] = createSignal<ProcessWindow[]>([])
  const [selected, setSelected] = createSignal<number>(0)

  createEffect(async () => {
    const res = await invoke('get_windows')
    setWindows(res)
  })

  return (
    <>
      <Header tag={HeaderTags.H1}>Select a process</Header>
      {
        windows().length > 0 ? (
          <Dropdown
            options={windows().map((w: ProcessWindow) => {
              return {
                label: w.process_name,
                value: w.pid,
              }
            })}
            placeholder={'Select process...'}
            maxVisibleItems={5}
            closeOnSelect={true}
            onChange={(e) => setSelected(e.target.value)}
            selected={selected()}
          />
        ) : (
          <Text>
            Please wait...
          </Text>
        )
      }
    </>
  )
}