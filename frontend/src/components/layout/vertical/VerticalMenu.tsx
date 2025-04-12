// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu,MenuItem} from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { AuthActions } from "@/app/auth/utils";

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const router = useRouter()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

   const { getUserData } = AuthActions();
   const userData = getUserData();

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar
  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem
            // href={`/`}
            icon={<i className='ri-home-smile-line' />}
            // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
            onClick={() => {
              router.push('/dashboard');
            }}
          >
              Dashboard
          </MenuItem>
          {userData?.is_admin?<MenuItem
            /* href={`/manage_employee`} */
            onClick={() => {
              router.push('/teams');
            }
            }
            icon={<i className='ri-group-fill' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des équipes
          </MenuItem>:null}
          {userData?.is_manager?<MenuItem
            onClick={() => {
              router.push('/manage_vacation');
            }}
            icon={<i className='ri-book-2-fill' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des congés
          </MenuItem>:null}
          <MenuItem
            onClick={() => {
              router.push('/my_vacation');
            }}
            icon={<i className='ri-flight-takeoff-line' />}
            // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Mes congés
          </MenuItem>
          {userData?.is_admin||userData?.is_manager?<MenuItem
            onClick={() => {
              router.push('/manage_training');
            }}
            icon={<i className='ri-book-2-fill' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des formations
          </MenuItem>:null}
          {userData?.is_manager?<MenuItem
            onClick={() => {
              router.push('/manage_training_registration');
            }}
            icon={<i className='ri-book-2-fill' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            validation des formations
          </MenuItem>:null}
          {userData?.is_admin?<MenuItem
            /* href={`/manage_employee`} */
            onClick={() => {
              router.push('/skills');
            }
            }
            icon={<i className='ri-survey-line' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des compétences
          </MenuItem>:null}
          <MenuItem
            onClick={() => {
              router.push('/my_training');
            }}
            icon={<i className='ri-book-2-fill' />}
            //suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Mes formations
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/manage_evaluation');
            }}
            icon={<i className='ri-survey-line' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des évaluations
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/my_evaluation');
            }}
            icon={<i className='ri-survey-line' />}
            //suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Mes évaluations
          </MenuItem>
          {userData?.is_admin?<MenuItem
            /* href={`/manage_employee`} */
            onClick={() => {
              router.push('/manage_employee');
            }
            }
            icon={<i className='ri-group-fill' />}
            /* suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />} */
            target='_blank'
          >
            Gestion des employés
          </MenuItem>:null}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
