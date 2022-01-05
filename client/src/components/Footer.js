import EditBtn from "./Buttons/EditBtn";
import AddBtn from "./Buttons/AddBtn";

const Footer = ({ pathname="todo" }) => {
    return (
        <div className="position-absolute bottom-0 start-0 justify-content-end d-flex justify-content-end w-100 bg-white" style={{ zIndex: "50" }}>
            {pathname === "todo" ? <AddBtn /> : <EditBtn pathname={pathname} />}
        </div>
    )
}

export default Footer