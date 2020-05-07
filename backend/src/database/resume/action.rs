use super::Database;

use tokio::fs;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

impl Database {
    // ---------------------------Visitor Methods---------------------------
    pub async fn get_resume(&self) -> Result<String> {
        Ok(fs::read_to_string(&self.file_path).await?)
    }

    // ---------------------------Admin Methods---------------------------
    pub async fn post_resume(&self, resume: String) -> Result<()> {
        Ok(fs::write(&self.file_path, resume).await?)
    }
}

#[derive(Debug)]
pub enum Error {
    FileIO(tokio::io::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            FileIO(io_error) => format!("File IO error: {}", io_error),
        };

        write!(f, "{}", message)
    }
}

impl From<tokio::io::Error> for Error {
    fn from(io_error: tokio::io::Error) -> Error {
        Error::FileIO(io_error)
    }
}