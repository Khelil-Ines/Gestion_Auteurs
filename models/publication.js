const mongoose = require ("mongoose")
const publicationSchema = mongoose.Schema(
    {
        titre: {type: String, require : true},
        date : { type : Date, default: Date.now },
        contenu:{ type: String, require : true},
        virtuals: {
           resume : {
            get(){
                return contenu.slice(10) + "...";
            }
        }
        }
        
//         student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' 
// }],

    }
)


module.exports = mongoose.model("Publication", publicationSchema)
