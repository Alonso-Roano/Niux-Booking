import Utils from "@admin/functions/Utils";

function View({ data, title }: any) {

    return (
    <>
        <h2 className="titleDrawer">{title}</h2>
        <div className="dashInfo" dangerouslySetInnerHTML={{ __html: Utils.mapJsonToHtml(data) }} />
    </>
    );
}

export default View;