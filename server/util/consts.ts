export enum MenuSection {
    TOP = 'TOP',
    MIDDLE = 'MIDDLE',
    BOTTOM = 'BOTTOM',
}

export interface MenuItemProps {
    title: string;
    path: string;
    icon?: string;
    section: MenuSection;
}

export const menuData: MenuItemProps[] = [
    {
        title: 'home',
        path: '/',
        section: MenuSection.TOP,
    },
];
