use tide::prelude::*;
use tide::Request;

#[derive(Debug, Deserialize, Serialize)]
struct Animal {
    name: String,
    legs: u8,
}
#[async_std::main]
async fn main() -> tide::Result<()> {
    tide::log::start();
    let mut app = tide::new();
    app.at("/").get(|_| async {
        Ok(json!({
            "message": "See below for available endpoints/actions",
            "endpoints": {
                "GET_ALL": "/posts",
                "GET": "/posts/:id",
                "POST": "/posts title body userID",
                "PUT": "/posts id title body userId",
                "PATCH": "/posts/:id title? body? userId?",
                "DELETE": "/posts/:id"
            }
        }))
    });
    app.at("/posts").get(get_all_posts);
    app.listen("localhost:8080").await?;
    Ok(())
}

async fn get_all_posts(_: Request<()>) -> tide::Result {
    let body = reqwest::get("https://jsonplaceholder.typicode.com/posts")
        .await?
        .text()
        .await?;

    Ok(format!("{}", body).into())
}
// async fn order_shoes(mut req: Request<()>) -> tide::Result {
//     let Animal { name, legs } = req.body_json().await?;
//     Ok(format!("Hello, {}! I've put in an order for {} shoes", name, legs).into())
// }
