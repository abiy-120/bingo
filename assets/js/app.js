let element = new Element();

class Bingo {
    constructor () {
        this.lang = "en";
        this.game_started = false;
        this.game_ended = false;
        this.bingo = false;
        this.all_values = bingo_data["all_values"];
        this.all_used = bingo_data["all_values"];
        this.used_values = [];
        this.shuffling = false;
        this.current_box_id;
        let self = this;
        this.all_length = bingo_data["all_values"].length;
        let each_length = bingo_data["all_values"].length/5;
        element.create(
            [],
            ["boxdivs_container"], 
            [],
            ["div"],
            [5],
            [["first_container", "sencond_container", "third_container", "fourth_container", "fifth_container"]],
            [["box_container row"]]
        )

        let box_conts = $(".box_container");
        let first_id = 1
        
        for (let box_cont of box_conts) {
            let cont_id = box_cont.id;
            element.create(
                [],
                [cont_id], 
                [],
                ["div"],
                [each_length],
                [element.setIds(this.all_length, first_id, "")],
                [["box col"]]
            )
            first_id+=each_length;
        }

        $("#play_btn").click(function () {
            if (!self.shuffling) {
                let text = self.lang == "ti" ? "ቐፅል" : "Next";
                $(this).text(text)
                self.game();
                self.shuffling = true;
            }
        });

        $("#bingo_btn").click(function () {
            if (!self.bingo && self.game_started) {
                let left_boxes = $(".boxdivs_container").find(".box[data-picked!='picked']");
                let i = 0;
                let interval = setInterval(() => {
                    if (i >= left_boxes.length) {
                        clearInterval(interval);
                    } else {
                        let box = left_boxes[i];
                        box.innerText = self.all_values[i]
                        box.classList.add("bingo")
                        i++;
                    }
                }, 100);
                self.bingo = true;                    
            }
        });

        $("#lang-select").change(() => {
            let select = $("#lang-select");
            let nodes = $("h2, .cbtn");
            this.lang = select.val();
            for (const node of nodes) {
                let text = node.innerText;
                node.innerText = lang_dict[this.lang][text]
            }   
        });
    }
    
    game () {
        if (!this.game_started) {
            this.game_started = true;
            this.current_box_id = 1;
        }

        if (this.all_values.length <= 0) {
            this.game_ended = true;
            let btn = $("#play_btn");
            let btn_text = this.lang == "ti" ? "ፀወታ ተወዲኡ" : "Game Over"
            btn.removeClass("blue").addClass("cancel").text(btn_text).attr("disabled", true)
        } else {
            let rand = this.random(1, 0, this.all_values.length);
            let current_box = $(`#${this.current_box_id}`);
            this.current_box_id+=1;
            let picked_value = this.all_values[rand]
            this.used_values.push(picked_value);
            this.all_values = this.all_values.filter((value) => {
                return value != picked_value
            })
            this.shuffle(current_box, 5, () => {
                current_box.text(picked_value);
                current_box.addClass("picked");
                current_box.attr("data-picked", "picked");
                this.shuffling = false;
            });
        }
    }

    random (n, min, max) {
        if (n == 1) {
            return Math.floor(Math.random() * (max - min) + min);
        } else{
            const ret_arr = [];
            for(i=0; i<n; i++) {
                const randomNumber = Math.floor(Math.random() * (max - min) + min);
                ret_arr.push(randomNumber);
            }
            return ret_arr;    
        }
    }

    shuffle (el, n, callback) {
        let count = 0;
        let interval = setInterval(() => {
                    if (count >= n) {
                        clearInterval(interval);
                        callback();
                    } else {
                        count++;
                        let rand = this.random(1, 0, this.all_used.length);
                        el.text(this.all_used[rand])
                    }
                }, 50)
    }
}

let bingo = new Bingo()