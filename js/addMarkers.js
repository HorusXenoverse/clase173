AFRAME.registerComponent("create-markers", {
  init: async function () {
    var mainScene = document.querySelector("#main-scene");
    var dishes = await this.getDishes();
    dishes.map(dish => {
      var marker = document.createElement("a-marker");
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", dish.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // Obtener el día
      var todaysDate = new Date();
      var todaysDay = todaysDate.getDay();
      // Domingo - Sábado : 0 - 6
      var days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
      ];

      if (!dish.unavailable_days.includes(days[todaysDay])) {
        // Añadir el modelo 3D a la escena
        var model = document.createElement("a-entity");
        model.setAttribute("id", `model-${dish.id}`);
        model.setAttribute("position", dish.model_geometry.position);
        model.setAttribute("rotation", dish.model_geometry.rotation);
        model.setAttribute("scale", dish.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${dish.model_url})`);
        model.setAttribute("gesture-handler", {});
        model.setAttribute("visible", false);
        marker.appendChild(model);

        // Contenedor de ingredientes
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${dish.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        mainPlane.setAttribute("visible", false);
        marker.appendChild(mainPlane);

        // Plano del fondo del título del platillo
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${dish.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);

        // Título del platillo
        var dishTitle = document.createElement("a-entity");
        dishTitle.setAttribute("id", `dish-title-${dish.id}`);
        dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        dishTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: dish.nombre.toUpperCase()
        });
        titlePlane.appendChild(dishTitle);

        // Lista de ingredientes
        var ingredients = document.createElement("a-entity");
        ingredients.setAttribute("id", `ingredients-${dish.id}`);
        ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        ingredients.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${dish.ingredientes.join("\n\n")}`
        });
        mainPlane.appendChild(ingredients);

        //Plano para mostrar el precio del platillo
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${dish.id}`);
        pricePlane.setAttribute(
          "src", "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        pricePlane.setAttribute("visible", false);

        //Precio del platillo
        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${dish.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Solo\n $${dish.price}`
        });

      
        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);

        //Estrellas
        var ratingPlane = document.createElement("a-entity");
        ratingPlane.setAttribute("id", `ratingPlane-${dish.id}`);
        ratingPlane.setAttribute("position", {x: 2, y: 0, z: 0.5});
        ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        ratingPlane.setAttribute("geometry", {
          primitive: "plane",
          width: 0.5,
          height: 0.3
        });
        ratingPlane.setAttribute("material", {color: "#F0C30F"});
        ratingPlane.setAttribute("visible", false)

        var stars = document.createElement("a-entity");
        stars.setAttribute("id", `stars-${dish.id}`);
        stars.setAttribute("position", {x: 0, y: 0.05, z: 0.1});
        stars.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        stars.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.4,
          align: "center",
          value: `Calificación del cliente: ${dish.last_rating}`
        })

        ratingPlane.appendChild(stars)
        marker.appendChild(ratingPlane)

        //Comentarios
        var feedbackPlane = document.createElement("a-entity");
        feedbackPlane.setAttribute("id", `feedbackPlane-${dish.id}`);
        feedbackPlane.setAttribute("position", {x: 2, y: 0, z: 0.5});
        feedbackPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        feedbackPlane.setAttribute("geometry", {
          primitive: "plane",
          width: 0.5,
          height: 0.3
        });
        feedbackPlane.setAttribute("material", {color: "#F0C30F"});
        feedbackPlane.setAttribute("visible", false)

        var feedback = document.createElement("a-entity");
        feedback.setAttribute("id", `feedback-${dish.id}`);
        feedback.setAttribute("position", {x: 0, y: 1, z: 0.1});
        feedback.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        feedback.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.4,
          align: "center",
          value: `Reseña del cliente: ${dish.last_review}`
        })

        feedbackPlane.appendChild(feedback)
        marker.appendChild(feedbackPlane)

      }
    });
  },
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("platillos")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
