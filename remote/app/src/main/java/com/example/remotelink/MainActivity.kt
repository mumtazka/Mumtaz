package com.example.remotelink

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import android.widget.Toast
import java.net.ServerSocket
import java.net.Socket
import kotlin.concurrent.thread

class MainActivity : AppCompatActivity() {

    private lateinit var btnServer: Button
    private lateinit var btnClient: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnServer = findViewById(R.id.btnServer)
        btnClient = findViewById(R.id.btnClient)

        btnServer.setOnClickListener {
            Toast.makeText(this, "Server mode aktif...", Toast.LENGTH_SHORT).show()
            startServer()
        }

        btnClient.setOnClickListener {
            Toast.makeText(this, "Client mode aktif...", Toast.LENGTH_SHORT).show()
            startClient()
        }
    }

    // MODE SERVER
    private fun startServer() {
        thread {
            try {
                val serverSocket = ServerSocket(9000)
                println("Server listening di port 9000...")
                val socket = serverSocket.accept()
                println("Client terhubung: ${socket.inetAddress.hostAddress}")

                socket.getOutputStream().write("Halo dari SERVER!\n".toByteArray())

                socket.close()
                serverSocket.close()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    // MODE CLIENT
    private fun startClient() {
        thread {
            try {
                val socket = Socket("192.168.1.10", 9000) // ganti IP sesuai device server
                val input = socket.getInputStream().bufferedReader().readLine()
                println("Pesan dari server: $input")
                socket.close()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
