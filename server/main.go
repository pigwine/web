package main

import (
	"database/sql"
	"log"
	"net/http"
	"server/handlers"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gorilla/mux"
)

var db *sql.DB

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	// 设置日志格式
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	log.Println("Server starting...")

	r := mux.NewRouter()
	r.Use(corsMiddleware)

	r.HandleFunc("/register", handlers.Register).Methods("POST", "OPTIONS")
	r.HandleFunc("/login", handlers.Login).Methods("POST", "OPTIONS")

	// 添加数据库连接
	var err error
	db, err = sql.Open("mysql", "root:12344321@tcp(localhost:3306)/userdb?parseTime=true")
	if err != nil {
		log.Fatal("数据库连接失败:", err)
	}
	defer db.Close()

	// 测试数据库连接
	err = db.Ping()
	if err != nil {
		log.Fatal("数据库连接测试失败:", err)
	}
	log.Println("数据库连接成功！")
	// Initialize database in handlers package
	handlers.InitDB(db)

	log.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
