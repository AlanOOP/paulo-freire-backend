import AcademyActivities from "./AcademyActivities.js";
import ImageActivities from "./ImagesActivities.js";

ImageActivities.belongsTo(AcademyActivities, {
    foreignKey: "academyActivityId"
});


export  {
    AcademyActivities,
    ImageActivities
};