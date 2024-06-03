const btn = document.querySelectorAll(".btn span");
const monthlySales = [];

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        monthlySales.push(
            parseInt(this.closest(".container").querySelector("input").value)
        );
        const nextDot = document.querySelector(
            "nav .dot.step_" +
                (parseInt(this.getAttribute("data-step")) + 1) +
                ""
        );
        if (nextDot) {
            nextDot.classList.add("done");
        } else {
            localStorage.setItem("monthlySales", JSON.stringify(monthlySales));
            window.location.href = "/html/result.html";
        }
        turn(parseInt(this.getAttribute("data-step")));
    });
}

function turn(step) {
    if (!!document.querySelector("#step__" + (step - 1))) {
        document.querySelector("#step__" + (step - 1)).classList.add("hidden");
    }

    document.querySelector("#step__" + step).classList.add("cube__face--top");
    document
        .querySelector("#step__" + step)
        .classList.remove("cube__face--front");

    step += 1;
    if (!!document.querySelector("#step__" + step)) {
        document
            .querySelector("#step__" + step)
            .classList.add("cube__face--front");
        if (!!document.querySelector("#step__" + step + " input")) {
            document.querySelector("#step__" + step + " input").focus();
        }
        document
            .querySelector("#step__" + step)
            .classList.remove("cube__face--bottom");
    }

    step += 1;
    if (!!document.querySelector("#step__" + step)) {
        document
            .querySelector("#step__" + step)
            .classList.add("cube__face--bottom");
    }
}

const inputs = document.querySelectorAll(".cube__face input");
const salesPattern = /^[0-9]{1,10}$/;
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function (e) {
        if (this.value.length > 1 && this.value.match(salesPattern)) {
            this.closest(".container")
                .querySelector(".btn")
                .classList.add("show");
            if (e.keyCode == 13) {
                this.closest(".container").querySelector(".btn span").click();
            }
        } else {
            this.closest(".container")
                .querySelector(".btn")
                .classList.remove("show");
        }
    });
}
