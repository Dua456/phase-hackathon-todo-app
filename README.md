# In-Memory Python Console Todo App

A simple, console-based todo application that runs in memory using only standard Python libraries.

## Features

- Add new todos with descriptions
- List all todos with completion status
- Mark todos as complete
- Delete todos
- Interactive command-line interface

## Requirements

- Python 3.x
- No external dependencies (uses only standard library)

## Usage

Run the application:
```bash
python src/main.py
```

Or run with a command:
```bash
python src/main.py add "Buy groceries"
python src/main.py list
python src/main.py complete 1
python src/main.py delete 1
```

## Available Commands

- `add <description>` - Add a new todo
- `list` - List all todos
- `complete <id>` - Mark a todo as complete
- `delete <id>` - Delete a todo
- `help` - Show help information
- `quit` - Exit the application

## Architecture

- **TodoManager**: Handles all todo operations in memory
- **ConsoleInterface**: Manages user input/output and command processing
- **Main**: Orchestrates the application components

## Design Notes

- Data is stored in-memory only (no persistence)
- Uses Python standard library only
- Follows object-oriented design principles
- Implements error handling for invalid inputs"# hackathon-todo-app" 
"# Agentic Todo Application - Phase I" 
