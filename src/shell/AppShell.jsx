import Sidebar from './Sidebar'
import TopBar from './TopBar'
import BackToolbar from './BackToolbar'
import VerticalTabs from './VerticalTabs'

/**
 * AppShell — composes Sidebar + TopBar + content area.
 *
 * Usage:
 *
 *   <AppShell
 *     sidebar="main-nav"        or "settings" or null (for vertical-tabs layout)
 *     sidebarProps={{ ... }}    see Sidebar.jsx for full prop reference
 *     topbar="tabbed"           or "simple"
 *     topbarProps={{ ... }}     see TopBar.jsx for full prop reference
 *     verticalTabs={{ tabs: [...], activeTab: '', onTabChange: () => {} }}
 *   >
 *     <Canvas level={1}>
 *       page content here
 *     </Canvas>
 *   </AppShell>
 *
 * Children should always be a Canvas (level 1 or 2).
 * The shell handles nothing inside the canvas — pages own their content.
 */
export default function AppShell({
  sidebar = 'main-nav',
  sidebarProps = {},
  topbar = 'tabbed',
  topbarProps = {},
  backToolbar,
  verticalTabs,
  children,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      {sidebar && <Sidebar variant={sidebar} {...sidebarProps} />}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar variant={topbar} {...topbarProps} />
        {backToolbar && <BackToolbar {...backToolbar} />}
        <main className="flex-1 flex min-h-0">
          {verticalTabs && <VerticalTabs {...verticalTabs} />}
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
