![Alt text](assets/ezed-web-logo.jpeg)
# Model Visualization Platform
#### This repository houses the content for the eZED Model Visualization Web Application.

The HTML content is deployed via GitHub Pages under the "pages" branch.

### Model Upload Notes:
- Currently, the only supported format is an OBJ & MTL pair.
- Any other embedded data within the OBJ file, such as positional data, will also be shown in the visualization.
- Model scale is calculated via the length of the model's bounding box, and the camera height is set to the center of the same bounding box.
- Models can be uploaded via the Upload Assistant desktop application. This assistant can be downloaded from the main branch of this repository.

### Accessing Your Chosen Model:
The required model can be accessed via the QR code generated in the downloads folder or by altering the URL parameters.

##### URL: `https://tannin-h.github.io/Model-Viewer/?model=YOUR-CHOSEN-MODEL`

Replace the fully capitalized field with the text displayed in the part reference field.

#### NOTE: If this field is filled incorrectly (i.e., missing or does not match a model in the database), the application will continuously load.

### Model Deletion Protocol
1. Navigate to the pages branch 
1. Navigate into the directory of the model to be deleted so that you can see both the obj and mtl files.
1. select the three dots next to add file and choose **Delete Directory**
1. Follow the prompts to commit the changes
1. Open the **models.json** file and select the pencil in the menu bar to edit the file
1. Remove the dictionary item of the model that needs to be removed. Note the apostrophes after everymodel except the last

Before Removing:
```json
{
  "models": {
    "Model1": {
      "obj": "Models/Model1/Model1.obj",
      "mtl": "Models/Model1/Model1.mtl"
    },
    "Model2": {
      "obj": "Models/Model2/Model2.obj",
      "mtl": "Models/Model2/Model2.mtl"
    },
    "Model3": {
      "obj": "Models/Model3/Model3.obj",
      "mtl": "Models/Model3/Model3.mtl"
    }
  }
}

```

After Removing:
```json
{
  "models": {
    "Model1": {
      "obj": "Models/Model1/Model1.obj",
      "mtl": "Models/Model1/Model1.mtl"
    },
    "Model2": {
      "obj": "Models/Model3/Model3.obj",
      "mtl": "Models/Model3/Model3.mtl"
    }
  }
}
```




---

**Copyright © 2024 eZED Ltd. All rights reserved.**

**Property of eZED Ltd.**
