import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Programas',
            icon: 'pi pi-fw pi-file',
            command: () => navigate('/programa')
        },
        {
            label: 'Docentes',
            icon: 'pi pi-fw pi-pencil',
            command: () => navigate('/docente')
        },
        {
            label: 'Modificações',
            icon: 'pi pi-fw pi-user',
            command: () => navigate('/')
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
            command: () => navigate('/sair')
        }
    ];

    const start = <h2>SPPG</h2>;
    // const end = <InputText placeholder="Search" type="text" className="w-full"/>;
    const style = {
        width: '80vw'
    }
    
    return (
        <div className="card" style={style}>
            <Menubar model={items} start={start}/>
        </div>
    );
}
