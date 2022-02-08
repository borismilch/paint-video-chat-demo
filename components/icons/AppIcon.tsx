import React, { ReactElement } from 'react';

interface AppIconProps {
  Icon: ReactElement<any, any>, 
  onClick?: () => void, 
  tooltip?: [string, string], 
  classes?: string, 
  text?: string 
}

const AppIcon: React.FC<AppIconProps> = (props) => {

  const {Icon, onClick, tooltip, classes, text} = props

  return (
    <div
      onClick={onClick && onClick.bind(null)}
      className={"appIconBody group " + classes}>

      <div className="flex items-center gap-2 px-1">

        {Icon}

        { text && <p className='text-placeholder text-sm '>{text}</p>}
      
      </div>  

     { tooltip && <div className={"tooltip z-40 " + tooltip[1]}>

        {tooltip[0]}

      </div>}

    </div>
  )
};

export default AppIcon;
