export default interface ISidebarItem {
  text: string 
  to?: string
  id?: string 
  onClick?: () => void
}