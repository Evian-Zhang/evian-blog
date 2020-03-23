// Using `#[derive(Queryable)]` assumes that the order of fields on the target struct matches the columns in the corresponding table, so make sure to define them in the order seen in the `schema.rs` file
#[derive(Queryable)]
pub struct Tag {
    pub id: usize,
    pub name: String,
}