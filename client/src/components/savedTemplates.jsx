const SavedTemplates=({templates,onSelectTemplate})=>{
    return(
        <>
            <h2>Saved Email Templates</h2>
            <div>
                {templates.map((x, i) => {
                return <button style={{ margin: "10px" }}  onClick={()=>onSelectTemplate(x._id)}key={i}>Template {i+1}</button>;
                })}
            </div>
        </>
    )
}
export default SavedTemplates