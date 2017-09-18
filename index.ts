import { JumpFm, Panel } from 'jumpfm-api'

import * as fs from 'fs-extra';
import * as homedir from 'homedir';
import * as path from 'path';

export const load = (jumpFm: JumpFm) => {
    const bind = jumpFm.bind
    const shell = jumpFm.electron.shell
    const panels = jumpFm.panels

    bind('switchPanel', ['tab'], jumpFm.panelsSwitch)

    // OPEN TO
    const openTo = (source: Panel, dist: Panel) => {
        const item = source.getCurrentItem()
        dist.cd(
            fs.statSync(item.path).isDirectory() ?
                item.path :
                source.getUrl().path
        )
    }

    bind('openToRight', ['ctrl+right'], () =>
        openTo(
            jumpFm.panels[0],
            jumpFm.panels[1],
        )
    )

    bind('openToLeft', ['ctrl+left'], () =>
        openTo(
            jumpFm.panels[1],
            jumpFm.panels[0],
        )
    )

    // SWAP PANELS
    bind('swapPanels', ['s'], jumpFm.panelsSwap)

    panels.forEach(panel => {
        panel.filterBox.bind('switchPanel', ['tab'], () => {
            panel.filterBox.hide()
            jumpFm.panelsSwitch()
        })

        // UP
        const up = [
            'up'
            , ['up', ']']
            , () => panel.step(-1)
        ]
        panel.bind.apply(null, up)
        panel.filterBox.bind.apply(null, up)

        // UP SELECT
        const upSelect = [
            'upSelect'
            , ['shift+up', 'shift+]']
            , () => panel.step(-1, true)
        ]
        panel.bind.apply(null, upSelect)
        panel.filterBox.bind.apply(null, upSelect)

        // DOWN
        const down = [
            'down'
            , ['down', '[']
            , () => panel.step(1)
        ]
        panel.bind.apply(null, down)
        panel.filterBox.bind.apply(null, down)

        // DOWN SELECT
        const downSelect = [
            'downSelect'
            , ['shift+down', 'shift+[']
            , () => panel.step(1, true)
        ]
        panel.bind.apply(null, downSelect)
        panel.filterBox.bind.apply(null, downSelect)

        // PAGE UP
        const pgUp = [
            'pageUp'
            , ['pageup', 'ctrl+]']
            , () => panel.stepPgUp()
        ]
        panel.bind.apply(null, pgUp)
        panel.filterBox.bind.apply(null, pgUp)

        // PAGE UP SELECT
        const pgUpSelect = [
            'pageUpSelect'
            , ['shift+pageup', 'shift+ctrl+]']
            , () => panel.stepPgUp(true)
        ]
        panel.bind.apply(null, pgUpSelect)
        panel.filterBox.bind.apply(null, pgUpSelect)

        // PAGE DOWN
        const pgDown = [
            'pageDown'
            , ['pagedown', 'ctrl+[']
            , () => panel.stepPgDown()
        ]
        panel.bind.apply(null, pgDown)
        panel.filterBox.bind.apply(null, pgDown)

        // PAGE DOWN SELECT
        const pgDownSelect = [
            'pageDownSelect'
            , ['shift+pagedown', 'shift+ctrl+[']
            , () => panel.stepPgDown(true)
        ]
        panel.bind.apply(null, pgDownSelect)
        panel.filterBox.bind.apply(null, pgDownSelect)

        // HOME
        panel.bind('goStart', ['home'], () =>
            panel.stepStart()
        )

        // HOME SELECT
        panel.bind('goStartSelect', ['shift+home'], () =>
            panel.stepStart(true)
        )

        // END
        panel.bind('goEnd', ['end'], () =>
            panel.stepEnd()
        )

        // END SELECT
        panel.bind('goEndSelect', ['shift+end'], () =>
            panel.stepEnd(true)
        )

        // SELECT ALL
        panel.bind('selectAll', ['ctrl+a'], () =>
            panel.selectAll()
        )

        // SELECT NONE
        panel.bind('deselectAll', ['esc'], () =>
            panel.selectNone()
        )

        // TOGGLE SELECTION
        panel.bind('toggleSelection', ['space'], () =>
            panel.selectToggleCurrent()
        )

        // ENTER
        const enter = () => {
            const item = panel.getCurrentItem()
            if (item.isDirectory()) {
                panel.filterBox.set('')
                panel.cd(item.path)
            }
            else item.open()
        }

        const bindEnter = ['enter', ['enter'], enter]
        panel.bind.apply(null, bindEnter)
        panel.filterBox.bind.apply(null, bindEnter)

        // BACK
        panel.bind('back', ['backspace'], () => {
            panel.cd(path.dirname(panel.getUrl().path))
        })

        // HOME DIR
        panel.bind('homeDir', ['ctrl+home'], () => {
            panel.cd(homedir())
        })
    })
}