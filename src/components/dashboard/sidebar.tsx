import classNames from 'classnames';
import { FC } from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { AngleRightIcon, ArrowRightFromBracketIcon, Gear } from '../../utils/icons';

/**
 * Dashboard sidebar component.
 */
export const DashboardSidebar: FC = () => {
  return (
    <nav className="p-2 bg-gray-200 dark:bg-gray-800">
      <div className="my-4">
        <SidebarHeader />
      </div>
      <ul className="flex flex-col space-y-2">
        <li>
          <SidebarLink to="" className="p-2 flex flex-row items-center justify-between">
            Overview
            <AngleRightIcon width="12" />
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="modules" className="p-2 flex flex-row items-center justify-between">
            Modules
            <AngleRightIcon width="12" />
          </SidebarLink>
        </li>
      </ul>
      <div className="my-4">
        <SidebarFooter />
      </div>
    </nav>
  );
}

/**
 * Sidebar header component.
 */
const SidebarHeader: FC = () => (
  <div>
    <h1 className="font-bold text-2xl text-primary">Guirlande Hub</h1>
    <h2 className="font-bold text-lg">Dashboard</h2>
  </div>
);

/**
 * Sidebar footer component.
 */
const SidebarFooter: FC = () => (
  <div className="flex flex-row-reverse items-center justify-between">
    <SidebarLink to="/logout" replace className="p-2 text-error">
      <ArrowRightFromBracketIcon width="16" />
    </SidebarLink>
    <SidebarLink to="/settings" replace className="p-2">
      <Gear width="16" />
    </SidebarLink>
  </div>
);

/**
 * Sidebar link component.
 */
const SidebarLink: FC<LinkProps> = ({ to, className, children, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  
  return (
    <Link to={to} className={classNames(
      className,
      'border border-gray-300 dark:border-gray-700',
      'rounded-md',
      'bg-primary hover:bg-opacity-50', {
        'bg-opacity-0': !match,
        'bg-opacity-20': match
      },
      'font-bold text-primary hover:text-white',
      'transition-all duration-200'
    )} {...props}>
      {children}
    </Link>
  );
}
