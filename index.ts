import { JumpFm, Panel } from 'jumpfm-api'

import * as fs from 'fs-extra';
import * as homedir from 'homedir';
import * as path from 'path';

export const load = (jumpFm: JumpFm) => {
    const bind = jumpFm.bind
    const shell = jumpFm.electron.shell
    const panels = jumpFm.panels

    bind('switchPanel', ['tab'], jumpFm.panelsSwitch)

    panels.forEach(panel => {
        panel.bind('up', ['up', ']'], () =>
            panel.step(-1)
        )

        panel.bind('upSelect', ['shift+up', 'shift+]'], () =>
            panel.step(-1, true)
        )

        panel.bind('down', ['down', '['], () =>
            panel.step(1)
        )

        panel.bind('downSelect', ['shift+down', 'shift+['], () =>
            panel.step(1, true)
        )

        panel.bind('pageUp', ['pageup', 'ctrl+]'], () =>
            panel.stepPgUp()
        )

        panel.bind('pageUpSelect', ['shift+pageup', 'shift+ctrl+]'], () =>
            panel.stepPgUp(true)
        )

        panel.bind('pageDown', ['pagedown', 'ctrl+['], () =>
            panel.stepPgDown()
        )

        panel.bind('pageDownSelect', ['shift+pagedown', 'shift+ctrl+['],
            () => panel.stepPgDown(true)
        )

        panel.bind('goStart', ['home'], () =>
            panel.stepStart()
        )

        panel.bind('goStartSelect', ['shift+home'], () =>
            panel.stepStart(true)
        )

        panel.bind('goEnd', ['end'], () =>
            panel.stepEnd()
        )

        panel.bind('goEndSelect', ['shift+end'], () =>
            panel.stepEnd(true)
        )
    })



    // bind('selectAll', ['ctrl+a'], () => activePan().selectAll()).filterMode()
    // bind('deselectAll', ['esc'], () => {
    //     activePan().filter.set('')
    //     activePan().deselectAll()
    // }).filterMode([])
    // bind('toggleSelection', ['space'], () => activePan().toggleCurSel()).filterMode([])
    // bind('hide').filterMode(['esc'], () => activePan().filter.hide())

    // const enter = () => {
    //     const pan = activePan()
    //     const path = pan.getCurItem().path
    //     if (fs.statSync(path).isDirectory()) {
    //         activePan().filter.set('')
    //         pan.cd(path)
    //     }
    //     else shell.openItem(path)
    // }

    // bind('enter', ['enter'], enter).filterMode()

    // bind('back', ['backspace'], () => {
    //     const pan = activePan()
    //     pan.cd(path.dirname(pan.getPath()))
    // }).filterMode([])

    // bind('homeDir', ['ctrl+home'], () => {
    //     activePan().cd(homedir())
    // }).filterMode([])

    // bind('openFilter', ['f'], () => activePan().filter.focus())
    // bind('likeThis', ['l'], () => {
    //     const pan = activePan()
    //     pan.filter.set(path.extname(pan.getCurItem().path))
    // }).filterMode([])
    // bind('swapPanels', ['s'], jumpFm.swapPanels).filterMode([])

    // const openTo = (source: Panel, dist: Panel) => {
    //     const item = source.getCurItem()
    //     dist.cd(
    //         fs.statSync(item.path).isDirectory() ?
    //             item.path :
    //             source.getPath()
    //     )
    // }

    // bind('openToRight', ['ctrl+right'], () =>
    //     openTo(
    //         jumpFm.panels[0],
    //         jumpFm.panels[1],
    //     )
    // ).filterMode()

    // bind('openToLeft', ['ctrl+left'], () =>
    //     openTo(
    //         jumpFm.panels[1],
    //         jumpFm.panels[0],
    //     )
    // ).filterMode()
}