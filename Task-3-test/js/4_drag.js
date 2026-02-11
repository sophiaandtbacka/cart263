
window.onload = setup;//when window finishes loading run setup
function setup() {
    console.log("drag ex"); //shows in console when setup runs

    let handleDragging = function (event) {//same as function handleDragging(event) {}, event makes it so an event object is created w a lot of info w what happened
        console.log("on drag")
        //HERE :: the event target refers to the object being dragged...
        console.log(event.target.id);//what has started to be dragged


        // Clear all prev drag data in cache (for all formats/types)
        event.dataTransfer.clearData();
        // The dataTransfer.setData() method sets the data type and the value of the dragged data
        event.dataTransfer.setData("objDraggedID", event.target.id);//stores info about this drag i.e. the name of the thing being dragged, setting this str name objDraggedID
    };
    window.addEventListener("dragstart", handleDragging);//when dragstart (this is a javascript thing) run handleDragging

    // IMPORTANT::By default, data/elements cannot be dropped in other elements.
    //To allow a drop, we must prevent the default handling of the element
    //combined the function and event listener can seperate them if you even want to do something complicated to dragover
    window.addEventListener("dragover", function (event) {//dragover fire as you drag an element over a target, it's like hover while dragging, what is happening when an element is being dragged, need to have this if you want drop to work
        console.log("over");
        event.preventDefault();//allows the drop to happen
    });

    /** NEW:: TO HANDLE DROPPING **/
    let handleDrop = function (event) {
        event.preventDefault();//tells brower to override default, default allows for no drops
        console.log("dropped");
        console.log(event);//gives info on Drag Event

        if (event.target.id === "dropTarget") {//if our draggable obj is dropped over the HTML and CSS dropTarget then do this stuff
            let theObj = event.dataTransfer.getData("objDraggedID");//get the data from drag start i.e. the name of the obj and call this obj
            console.log(theObj);//write the name of the obj 

            //event.target is the DIV we have dropped into ...
            // and so move it there..
            event.target.appendChild(document.getElementById(theObj));//doc thing gets the dragged obj, appendChild moves the element into the drop target div so the dragged obj visually moves
        }
    }
    window.addEventListener("drop", handleDrop);//when drop (Javascript thing) run handleDrop


    let handleDraggingStop = function (event) {
        console.log("on stop")
        //HERE :: the event target refers to the object being dragged...
        console.log(event.target.id);
        // HERE - this refers to the window
        console.log(this);//this about what object the listener was attached to
    };
    window.addEventListener("dragend", handleDraggingStop);




}

